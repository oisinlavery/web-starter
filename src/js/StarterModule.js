var StarterModule = function(){

  var $starter,
      $starterChild;

  function init(){
    render();
    setup();
    events();
  }

  function render(){
    var $starterHook = $("#starterHook");
    $starter = $(Templates.starter());
    $starterHook.replaceWith($starter);
  }

  function setup(){
    $starterChild = $starter.find("starter-child");
  }

  function events(){

    $starterChild.on("click", function(){
      console.log("click!");
    });
  }

  this.init = init;
  return this;

};