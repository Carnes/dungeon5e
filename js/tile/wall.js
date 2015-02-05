var Tile = Tile || {};

Tile.Wall = (function(){
    var tile = function(init){
        var self = this;
        self.type;

        init = init || {};
        init.type = TileType.Wall;

        self.render = function(){ return "#"; };

        self.init(init);
    };

    tile.prototype = new TileBase();

    return tile;
})();