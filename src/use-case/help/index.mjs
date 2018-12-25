export default handlers => {
  return {
    getName() {
      return "pomoc";
    },

    getManual() {
      return "wyświetl listę dostępnych komend (tę, którą właśnie czytasz ;)";
    },

    canHandleMessage(message) {
      return ["pomoc", "help"].some(keyWord => message.includes(keyWord));
    },

    execute(message) {
      const commands = handlers
        .filter(handler => !handler.hideFromHelp)
        .map(handler => {
          return `- ${handler.getName()} - ${handler.getManual()}`;
        })
        .join("\n");

      return `dostępne komendy to:\n${commands}`;
    }
  };
};
