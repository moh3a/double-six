import { usePlayer, useRound, useTeam, useTurns } from "../../hooks/store";
import Board from "./Board";
import Hand from "./Hand";
import Opponent from "./Opponent";
import Text from "../shared/Text";
import View from "../shared/View";

const Canvas = () => {
  const { status } = useRound();
  const { teams } = useTeam();
  const { players } = useTurns();
  const { id: playerId } = usePlayer();

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {teams &&
      teams.length === 2 &&
      teams[0].players?.length === 2 &&
      teams[1].players?.length === 2 &&
      status === "PLAYING" ? (
        <>
          <Board />
          {players.map((player, index) => (
            <>
              {player.id === playerId ? (
                <Hand key={index} />
              ) : (
                <Opponent
                  key={index}
                  side={index === 1 ? "right" : index === 2 ? "top" : "left"}
                  count={player.count}
                  playerId={player.id}
                />
              )}
            </>
          ))}
        </>
      ) : (
        <Text>starting game...</Text>
      )}
    </View>
  );
};

export default Canvas;
