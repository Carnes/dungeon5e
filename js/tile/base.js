var TileBase = (function(){
    var base = function(){
        var self = this;
    };
    var p = base.prototype;

    p.type = TileType.Unknown;
    p.render = function(){return ".";};
    p.init = function(init){
        this.type = init.type || TileType.Unknown;
    };

    return base;
})();