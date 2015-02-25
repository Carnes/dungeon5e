var Map = (function(){
    return function(totalX, totalY){
        var self = this;

        var sections = [];
        var minX = null;
        var minY = null;
        var maxX = null;
        var maxY = null;

        var map = [];
        var mapOffset = 10000; //WOOP WOOP Magic number alert

        self.X = totalX;
        self.Y = totalY;

        self.getTile = function(x, y){
            x+=mapOffset;
            y+=mapOffset;
            if(!map[y])
                return undefined;
            return map[y][x];
        };

        self.setTile = function(x, y, tile){
            x+=mapOffset;
            y+=mapOffset;
            if(!map[y])
                map[y]=[];
            map[y][x] = tile;
            if(minX == null || x < minX) minX = x;
            if(maxX == null || x > maxX) maxX = x;
            if(minY == null || y < minY) minY = y;
            if(maxY == null || y > maxY) maxY = y;
        };

        self.doesTileFit = function(x, y, tile){
            if(x+mapOffset < 0 || y+mapOffset < 0)
                return false;
            if(maxX != null && (x+mapOffset)> maxX && (x+mapOffset)-minX > totalX)
                return false;
            if(maxY != null && (y+mapOffset)> maxY && (y+mapOffset)-minY > totalY)
                return false;
            if(minX != null && (x+mapOffset)< minX && maxX-(x+mapOffset) > totalX)
                return false;
            if(minY != null && (y+mapOffset)< minY && maxY-(y+mapOffset) > totalY)
                return false;
            var gTile = self.getTile(x,y);
            if(gTile == undefined || gTile.type == tile.type || gTile.parent == tile.parent)
                return true;
            return false;
        };

        self.doesSectionFit = function(xOrigin, yOrigin, section){
            if(Array.isArray(section.map)==false)
                throw "Map.doesSectionFit requires section to be an array of tiles.";
            var itDoes = true;

            section.map.forEach(function(yGroup, y){
                yGroup.forEach(function(tile, x){
                    if(self.doesTileFit(x+xOrigin, y+yOrigin, tile) === false)
                        itDoes = false;
                });
            });
            return itDoes;
        };

        self.renderSectionInMap = function(xOrigin, yOrigin, section){
            if(Array.isArray(section.map)==false)
                throw "Map.doesSectionFit requires section to be an array of tiles.";
            section.map.forEach(function(yGroup, y){
                yGroup.forEach(function(tile, x){
                    var existingTile = self.getTile(x+xOrigin,y+yOrigin);
                    if(existingTile && (existingTile.parent != section || existingTile.parent == null)  && existingTile.type != tile.type)
                        console.log('WARNING: Overwriting tile: '+(x+xOrigin)+', '+(y+yOrigin));
                    self.setTile(x+xOrigin,y+yOrigin, tile);
                });
            });
        };

        self.refreshMap = function(){
            sections.forEach(function(sectionData){
                self.renderSectionInMap(sectionData.x, sectionData.y, sectionData.section);
            });
        };

        self.addSection = function(section, x, y){
            if(!(section instanceof SectionBase))
                throw "addSection must take a Section";
            if(self.doesSectionFit(x,y,section)===false)
                return false;
            self.renderSectionInMap(x, y,section);
            sections.push({section: section, x: x, y: y});
            return true;
        };

        self.renderAscii = function(){
            var output = '';
            var baseTileRender = new TileBase().render();
            for(var x=minX; x<=maxX; x++){
                for(var y=minY; y<=maxY; y++) {
                    var tile = self.getTile(x-mapOffset,y-mapOffset);
                    if(tile)
                        output+=tile.render();
                    else
                        output+= baseTileRender;
                }
                output+='\r\n';
            }
            return output;
        };

        return self;
    };
})();