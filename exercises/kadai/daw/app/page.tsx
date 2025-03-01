import Clock from "./clock";
import SoundPads from "./soundPads";

export default function Home() {
  return (
    <div>
      <SoundPads />
      <p>Press r key to record beat</p>
      <Clock />
    </div>
  );
}
