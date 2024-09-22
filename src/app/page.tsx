export default function Home() {
  return (
    <div className="m-8">
      {/* Intro */}
      <p className="text-2xl font-bold">aidea</p>
      <p>programming ideas for those who lack creativity</p>

      {/* Form */}
      <div>
        <p>I want to create a</p>
        <input placeholder="simple web app, game, etc." />
        <p>within</p>
        <input placeholder="one hour, week, etc." />
      </div>
    </div>
  );
}
