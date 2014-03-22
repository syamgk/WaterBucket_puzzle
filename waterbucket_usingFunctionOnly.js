var targrt ;
var queue = [];
var seen = {};
//#########################################

function addState(parentstate,newstate) {
  //add state if it's new. Remember its parent
  if (String(newstate) in seen)
    return;
  seen[String(newstate)] = String(parentstate);
  queue.push(newstate);
}    

function getState() {
  //return next state and pop it off the queue
  if ( ! queue.length)
    return;
  state = queue[0];
  queue = queue.slice(1);
  return state;
}

function getSolution() {
  //Return solution from latest state added
  solution = [];
  state = (queue.slice(-1)[0]);
  while (state) {
    solution.push(String(state));
    state = getParent(state);
  }
  solution.reverse();
  return solution;
}

function getParent(childState) {
  //return parent of state, if it exists
  try {
    return seen[String(childState)];
  }
  catch(error) {
    return;
  }
}
//##########################################
  
function test(oldstate,newstate) {
  //to check whether we reached the goal
  [newA , newB] = newstate;
  won = (newA == target || newB == target);
  addState(oldstate,newstate);
  return won;
}
function playGame( aMax, bMax ,goal) {
  //grab a state and generate 8 more to submit to the manager
  target = goal;
  addState("" , [0,0]);
  while (true) {
    oldstate = getState();
    [aHas,bHas] = oldstate
    if ( test(oldstate,[aMax,bHas]) )
      break;
    if ( test(oldstate,[0,bHas]) )
      break;
    if ( test(oldstate,[aHas,bMax]) )
      break;
    if ( test(oldstate,[aHas,0]) )
      break;
    howmuch = Math.min(aHas, bMax - bHas);
    if ( test(oldstate,[aHas-howmuch,bHas+howmuch]) )
      break;
    howmuch = Math.min(bHas, aMax-aHas);
    if ( test(oldstate,[aHas+howmuch,bHas-howmuch]) )
      break;
  }
  print("Solution is");
  show(getSolution());
  }

// Testing 
playGame(7,11,6);
