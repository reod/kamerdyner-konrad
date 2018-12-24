export default ({ environment, defaultEnvironment, environments }) => {
  const dependencies = {};

  environments.forEach(env => {
    dependencies[env] = {};
  });

  return {
    set(instance, envs = [defaultEnvironment]) {
      envs.forEach(env => {
        Object.assign(dependencies[env], instance);
      });
    },

    get(name, env = environment) {
      const wantedInstance = dependencies[env][name];
      const fallbackInstance = dependencies[defaultEnvironment][name];
      const instance = wantedInstance || fallbackInstance;

      return instance;
    }
  };
};
