var Tile = Tile || {};

Tile.Floor = (function(){
    var tile = function(init){
        var self = this;
        self.type;

        init = init || {};
        init.type = TileType.Floor;

        self.render = function(){ return " "; };

        self.init(init);
    };

    tile.prototype = new TileBase();

    return tile;
})();