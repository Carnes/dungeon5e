var Tile = Tile || {};

Tile.Door = (function(){
    var tile = function(init){
        var self = this;
        self.type;

        init = init || {};
        init.type = TileType.Door;

        self.render = function(){ return "X"; };

        self.init(init);
    };

    tile.prototype = new TileBase();

    return tile;
})();