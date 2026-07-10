import BootScene from "./scenes/BootScene.js";
import GameScene from "./scenes/GameScene.js";

new Phaser.Game({
type:Phaser.AUTO,
width:1280,
height:720,
physics:{
default:"arcade",
arcade:{
debug:false
}
},
scene:[
BootScene,
GameScene
]
});
