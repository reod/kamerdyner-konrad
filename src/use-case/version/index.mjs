export default ({ version }) => {
  return {
    getName,
    getManual,
    canHandleMessage,
    execute,
    hideFromHelp: true
  };

  function getName() {
    return "wersja";
  }

  function getManual() {
    return "wyświetla wersje aplikacji";
  }

  function canHandleMessage(message) {
    return ["wersja"].some(keyWord => message.includes(keyWord));
  }

  function execute(message) {
    return version;
  }
};
