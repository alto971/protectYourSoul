class IHMCoreManager {
    // méthode constructor
    constructor(phaserGame) {
        this.scoreText = phaserGame.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    updateScore(newScore){
        this.scoreText.setText('Score: ' + score);
    }
    
  }
  