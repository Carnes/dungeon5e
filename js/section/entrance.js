var Section = Section || {};

Section.Entrance = (function(){
    var section = function(variationNumber){
        var self = this;
        self.map=[];
        var variation = SectionData.Entrance[variationNumber];
        if(!variation)
            throw 'Cannot create Entrance '+variationNumber;

        self.createMap(variation);
    };

    section.prototype.getNewTileFromType = function(tileType){
        var self = this;
        var tile = null;
        switch(tileType) {
            case TileType.Wall:
                tile = new Tile.Wall();
                break;
            case TileType.Floor:
                tile = new Tile.Floor();
                break;
            case TileType.Door:
                tile = new Tile.Door();
                break;
            default:
                tile = new TileBase();
        }
        tile.parent = self;
        return tile;
    };

    section.prototype.setTile = function(x, y, tile){
        var self = this;
        if(!self.map[x])
            self.map[x]=[];
        self.map[x][y] = tile;
    };

    section.prototype.setTileType = function(x,y,tileType){
        var self = this;
        var tile = self.getNewTileFromType(tileType);
        self.setTile(x,y,tile);
    };

    section.prototype.createMap = function(variation){
        var self = this;
        variation.map.forEach(function(row){
            var newRow = [];
            row.forEach(function(tileType){
                newRow.push(self.getNewTileFromType(tileType));
            });
            self.map.push(newRow);
        });
    };

    return section;
})();