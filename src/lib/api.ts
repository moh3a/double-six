import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  where,
  updateDoc,
  arrayUnion,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import FirebaseApp from "@/config/firebase.config";
import { generateShuffledHands, generateToken } from "./helpers";
import { IGame } from "@/types";

export const createGame = async (playerId: string) => {
  const token = generateToken(6);
  const input: IGame = {
    status: "IDLE",
    admin: playerId,
    token,
    teams: [],
    players: [playerId],
    rounds: [],
  };
  const db = getFirestore(FirebaseApp);
  const gameRef = await addDoc(collection(db, "games"), input);
  await createTeams(gameRef.id, playerId);
  return {
    success: true,
    id: gameRef.id,
    message: "Successfully created a game.",
  };
};

export const cleanData = async (fbc: string, gameId: string) => {
  const db = getFirestore(FirebaseApp);
  const docsQuery = query(collection(db, fbc), where("gameId", "==", gameId));
  const docsSnap = await getDocs(docsQuery);
  for await (let document of docsSnap.docs) {
    await deleteDoc(doc(db, fbc, document.id));
  }
};

export const cancelGame = async (gameId: string) => {
  const db = getFirestore(FirebaseApp);
  const collections = ["rounds", "hands", "boards", "teams"];
  for await (let c of collections) {
    await cleanData(c, gameId);
  }
  await deleteDoc(doc(db, "games", gameId));
};

export const createTeams = async (gameId: string, playerId: string) => {
  const db = getFirestore(FirebaseApp);
  const gameRef = doc(db, "games", gameId);
  const gameSnap = await getDoc(gameRef);
  if (gameSnap.exists()) {
    await setDoc(doc(db, "teams", gameSnap.id + "1"), {
      gameId: gameSnap.id,
      players: [playerId],
    });
    await setDoc(doc(db, "teams", gameSnap.id + "2"), {
      gameId: gameSnap.id,
      players: [],
    });
    await updateDoc(gameRef, {
      teams: [gameSnap.id + "1", gameSnap.id + "2"],
    });
    return { success: true };
  } else return { success: false };
};

export const joinGame = async (token: string, playerId: string) => {
  const db = getFirestore(FirebaseApp);
  const querySnapshot = await getDocs(
    query(collection(db, "games"), where("token", "==", token))
  );
  if (!querySnapshot.empty && querySnapshot.size === 1) {
    let id = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.players && data.players.length < 4) {
        id = doc.id;
      }
    });
    if (id) {
      const docRef = doc(db, "games", id);
      await updateDoc(docRef, {
        players: arrayUnion(playerId),
      });
      // check if team 1 has 2 players then automatically join team 2
      const teamRef = doc(db, "teams", id + "1");
      const teamsSnap = await getDoc(teamRef);
      if (teamsSnap.exists()) {
        if (teamsSnap.data().players && teamsSnap.data().players.length === 2) {
          await updateDoc(doc(db, "teams", id + "2"), {
            players: arrayUnion(playerId),
          });
        }
      }
      return { success: true, id, message: "Successfully joined the game." };
    } else return { success: false, message: "Game not found." };
  } else return { success: false, message: "Invalid token!" };
};

export const removePlayer = async (gameId: string, playerId: string) => {
  const db = getFirestore(FirebaseApp);
  const gameRef = doc(db, "games", gameId);
  const gameSnapshot = await getDoc(gameRef);
  if (gameSnapshot.exists()) {
    const data = gameSnapshot.data();
    if (data.status === "IDLE") {
      await updateDoc(gameRef, {
        players: data.players.filter((p: string) => p !== playerId),
      });
      return { success: true, message: "Successfully removed player." };
    } else return { success: false, message: "Game has already started." };
  } else return { success: false, message: "Game not found!" };
};

export const chooseTeammate = async (gameId: string, playerId: string) => {
  const db = getFirestore(FirebaseApp);
  const gameRef = doc(db, "games", gameId);
  const teamRef = doc(db, "teams", gameId + "1");
  const otherTeamRef = doc(db, "teams", gameId + "2");
  const gameSnapshot = await getDoc(gameRef);
  if (gameSnapshot.exists()) {
    const data = gameSnapshot.data();
    if (data.players && data.players.length > 1) {
      const index = data.players.find((p: string) => p === playerId);
      if (index !== -1) {
        await updateDoc(teamRef, {
          players: arrayUnion(playerId),
        });
        await updateDoc(otherTeamRef, {
          players: data.players.filter(
            (p: string) => p !== playerId && p !== data.admin
          ),
        });
        return {
          success: true,
          message: "Your teammate was successfully set.",
        };
      } else return { success: false, message: "Player not in game!" };
    } else return { success: false, message: "Your alone!" };
  } else return { success: false, message: "Game not found!" };
};

export const startGame = async (gameId: string) => {
  const db = getFirestore(FirebaseApp);
  const gameRef = doc(db, "games", gameId);
  const gameSnapshot = await getDoc(gameRef);
  if (gameSnapshot.exists()) {
    const data = gameSnapshot.data();
    if (data.players && data.players.length === 4) {
      await updateDoc(gameRef, {
        status: "PLAYING",
      });
      return { success: true, message: "Game started!" };
    } else
      return { success: false, message: "There must be 4 players to start." };
  } else return { success: false, message: "Game not found!" };
};

export const createRound = async (gameId: string) => {
  const dominoes = generateShuffledHands();
  const db = getFirestore(FirebaseApp);
  const gameRef = doc(db, "games", gameId);
  const gameSnap = await getDoc(gameRef);
  if (gameSnap.exists()) {
    const players = gameSnap.data().players;
    if (players && players.length === 4) {
      const roundRef = await addDoc(collection(db, "rounds"), {
        gameId: gameSnap.id,
      });
      for await (let index of [0, 1, 2, 3]) {
        await setDoc(doc(db, "hands", players[index]), {
          gameId: gameSnap.id,
          roundId: roundRef.id,
          playerId: players[index],
          hand: dominoes.hands[index],
        });
      }
      await setDoc(doc(db, "boards", roundRef.id), {
        gameId: gameSnap.id,
        roundId: roundRef.id,
        startingPlayer: players[dominoes.index],
        board: [],
      });
      await updateDoc(gameRef, {
        rounds: arrayUnion(roundRef.id),
      });
      await updateDoc(roundRef, {
        turn: players[dominoes.index],
      });
      return {
        success: true,
        message: "Successfull round setup.",
        id: roundRef.id,
      };
    } else
      return { success: false, message: "There must be 4 players to start." };
  } else return { success: false, message: "Game not found!" };
};

export const playHand = async (
  playerId: string,
  roundId: string,
  dominoId: string,
  domino: string,
  addTo: "front" | "back",
  nextPlayer: string
) => {
  const db = getFirestore(FirebaseApp);
  const roundRef = doc(db, "rounds", roundId);
  const roundSnap = await getDoc(roundRef);
  if (roundSnap.exists()) {
    if (roundSnap.data().turn === playerId) {
      const handRef = doc(db, "hands", playerId);
      const handSnap = await getDoc(handRef);
      const boardRef = doc(db, "boards", roundId);
      const boardSnap = await getDoc(boardRef);
      if (handSnap.exists() && boardSnap.exists()) {
        await updateDoc(handRef, {
          hand: handSnap.data().hand.filter((h: string) => h !== dominoId),
        });
        const newboard =
          addTo === "front"
            ? [domino, ...boardSnap.data().board]
            : [...boardSnap.data().board, domino];
        await updateDoc(boardRef, {
          board: newboard,
        });
        await updateDoc(roundRef, { turn: nextPlayer });
        return { success: true, message: "Successfully played your hand." };
      } else return { success: false, message: "Player does not exist" };
    } else return { success: false, message: "Not your turn." };
  } else return { success: false, message: "Round not found!" };
};
