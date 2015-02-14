var Random = (function(){
    var self = {};

    self.int = function(max){
        return Math.floor(Math.random() * max);
    };

    return self;
})();
