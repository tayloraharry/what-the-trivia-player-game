export enum Levels {
  Socket,
  Err,
  Warning,
  Info,
}

export const colorLog = (message: string, level: Levels) => {
  const { Socket, Err, Warning, Info } = Levels;

  let color = "black";

  switch (level) {
    case Socket:
      message = "SOCKETS:" + message;
      color = "#28a745";
      break;
    case Info:
      color = "#343a40!";
      break;
    case Warning:
      color = "#ffc107";
      break;
    case Err:
      color = "#dc3545";
      break;
    default:
      color = color;
  }

  console.log("%c" + message, "color:" + color + "; background-color:" + 'black');
};
