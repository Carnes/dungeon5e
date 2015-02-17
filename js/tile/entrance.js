var Tile = Tile || {};

Tile.Entrance = (function(){
    var tile = function(init){
        var self = this;
        self.type;

        init = init || {};
        init.type = TileType.Entrance;

        self.render = function(){ return "@"; };

        self.init(init);
    };

    tile.prototype = new TileBase();

    return tile;
})();
