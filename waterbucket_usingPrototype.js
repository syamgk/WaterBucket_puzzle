function manager() {
  var this.queue = [];
  var this.seen = {};
}

manager.prototype.getState = function(){
  if ( ! this.queue.length)
    return;
  state = this.queue[0];
  this.queue = this.queue.slice(1);
  return state;
}
manager.prototype.addState = function(parentState,newState) {
  if (String(newState) in this.seen)
    return;
  this.seen[String(newState)] = String(parentState);
  this.queue.push(newState);
  print("--------Adding");
}
manager.prototype.getSolution = function() {
  
  solution = [];
  state = (this.queue.slice(-1)[0]);
  while (state) {
    solution.push(String(state));
    state = this.getParent(state);
  }
  solution.reverse();
  return solution;
}

manager.prototype.getParent = function(childState) {
  try {
    return this.seen[String(childState)];
  }
  catch(error) {
    return;
  }
}

function bucketPlayer() {
  this.manager = manager()
}

bucketPlayer.prototype.test = function(oldstate,newstate) {
  [newA , newB] = newstate;
  won = (newA == this.goal || newB == this.goal);
  this.manager.addState(oldstate,newstate);
  return won;
}
bucketPlayer.prototype.playGame = function(aMax,bMax,goal) {
  this.goal = goal;
  this.manager.addState("",[0,0])
  while (true) {
    oldstate = this.manager.getState();
    [aHas,bHas] = oldstate
    if ( this.test(oldstate,[aMax,bHas]) )
      break;
    if ( this.test(oldstate,[0,bHas]) )
      break;
    if ( this.test(oldstate,[aHas,bMax]) )
      break;
    if ( this.test(oldstate,[aHas,0]) )
      break;
    howmuch = Math.min(aHas, bMax - aHas);
    if ( this.test(oldstate,[aHas-howmuch,bHas+howmuch]) )
      break;
    howmuch = Math.min(bHas, aMax-aHas)
    if ( this.test(oldstate,[aHas+howmuch,bHas-howmuch]) )
      break;
    print("Solution is");
    print(this.manager.getSolution());
  }
}

