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

    section.prototype.createMap = function(variation){
        var self = this;
        variation.map.forEach(function(row){
            var newRow = [];
            row.forEach(function(tileType){
                switch(tileType) {
                    case TileType.Wall:
                        newRow.push(new Tile.Wall());
                        break;
                    case TileType.Floor:
                        newRow.push(new Tile.Floor());
                        break;
                    case TileType.Door:
                        newRow.push(new Tile.Door());
                        break;
                    default:
                        newRow.push(new TileBase());
                }
            });
            self.map.push(newRow);
        });
    };

    section.prototype.render = function(){
        var rowOutput = [];
        this.map.forEach(function(row){
            var colOutput = "";
            row.forEach(function(tile){
                colOutput += tile.render();
            });
            rowOutput.push(colOutput);
        });
        return rowOutput;
    };

    return section;
})();