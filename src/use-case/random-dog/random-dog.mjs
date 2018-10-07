import axios from "axios";

export { getRandomDog };

async function getRandomDog() {
  const randomDog = await axios.get("https://random.dog/woof.json");
  return randomDog.data.url;
}
