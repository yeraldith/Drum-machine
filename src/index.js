import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'


const drumKit = [
  {
    name: 'Heater-1',
    key: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },

  {
    name: 'Heater-2',
    key: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },

  {
    name: 'Heater-3',
    key: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },

  {
    name: 'Heater-4',
    key: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },

  {
    name: 'Clap',
    key: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },

  {
    name: 'Open-HH',
    key: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },

  {
    name: "Kick-'n-Hat",
    key: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },

  {
    name: 'Kick',
    key: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },

  {
    name: 'Closed-HH',
    key: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundName: '',
    }
  }
  handleClick = (e) => {
    this.setState({
      soundName: e.target.id
    });
    const id = e.target.innerText.trim();
    const audio = this.refs[id];
    audio.play();
  }
  handleKeyPress = (e) => {
    console.log(e)
    if (e.keyCode) {
      const srcs = this.props.drumKit.find(el => el.key == e.key.toUpperCase()).name;
      this.setState({
        soundName: srcs,
           
      });

    }
  }
  handleChange = (e) => {
    const volume = e.target.value / 100;
    document.querySelectorAll('audio').forEach(el => el.volume = volume);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    console.log()
    let drumPad = this.props.drumKit.map((item,index) =>
   <button key={index} className=" col-3 ml-2 mt-3 btn bg-secondary " onClick={this.handleClick} id={item.name}>
        {item.key}
        <audio className="clip" ref={item.key} id={item.key} src={item.src}></audio>
      </button>);

    return (
      <div className="container">
        <div className="card" id="drum-machine">
          <h1 className="card-header text-center">Drum Machine</h1>
          <div id="container" >
            <div id="content" >
              {drumPad}
            </div>
            <div id="display" >
              {this.state.soundName}
              <div className="row">
                <div className="col-3">
                <label>Volumen</label>
                </div>
                <input id="volume-range" type="range" min="0" max="100" className="volume" onChange={this.handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
};

ReactDOM.render(
  <Index drumKit={drumKit} />,
  //<Drummachine drum={drum}/>,
  document.getElementById('root'),
);
