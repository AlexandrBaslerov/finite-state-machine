class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config===undefined){throw Error();}
       this.state=config.initial;
       this.states=Object.getOwnPropertyNames(config.states);
       this.config=config;
       this.storyStates=[this.state];
       this.positionStory=0;
    }
   

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.states.indexOf(state)!==-1){
            this.state=state;
            this.storyStates.push(this.state);
            this.positionStory=this.storyStates.length-1;
        }
        else throw Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.state].transitions[event]!==undefined){
            this.state=this.config.states[this.state].transitions[event];
            if(this.storyStates[this.storyStates.length-1]!==this.state)
            this.storyStates.push(this.state);
            this.positionStory=this.storyStates.length-1;
        }
        else throw Error();
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state=this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event===undefined){
            return this.states;
          }
          else{
            var possibleStates = [];
            for (var i = 0; i < this.states.length; i++) {
              if(this.config.states[this.states[i]].transitions[event]){
                possibleStates.push(this.states[i]);
              }
            }
            return possibleStates;
          }
    }
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.positionStory===0) return false;
        else{
            this.state=this.storyStates[this.storyStates.length-2];
            this.positionStory--;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.positionStory === this.storyStates.length-1) {
            return false;
        }
        else{
            this.state=this.storyStates[this.positionStory+1];
            this.positionStory++;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.storyStates.length=1;
        this.positionStory=0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/