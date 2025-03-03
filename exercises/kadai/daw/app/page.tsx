import Clock from "./clock";
import SoundPads from "./soundPads";
import Piano from "./piano";

export default function Home() {
  return (
    <div>
      <SoundPads />
      <p>Press r key to record beat</p>
      <Piano />
      <Clock />
    </div>
  );
}
