import CreateSoundItem from "./Component/CreateSoundItem"
import SoundItem from "./Component/SoundItem"

function App() {
  return (
    <div className="App">
      <div className="header">header</div>
      <div className="Content">
        <SoundItem />
      </div>
      <div className="footer">
        <span>footer</span>
        <CreateSoundItem />
      </div>
    </div>
  )
}

export default App
