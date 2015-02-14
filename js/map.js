var Map = (function(){
    var map = function(totalX, totalY){
        var self = this;

        var sections = [];
        var minX = null;
        var minY = null;
        var maxX = null;
        var maxY = null;

        var graph = [];
        var graphOffset = 1000;

        self.getTile = function(x, y){
            x+=graphOffset;
            y+=graphOffset;
            if(!graph[x])
                return undefined;
            return graph[x][y];
        };

        self.setTile = function(x, y, tile){
            x+=graphOffset;
            y+=graphOffset;
            if(!graph[x])
                graph[x]=[];
            graph[x][y] = tile;
            if(minX == null || x < minX) minX = x;
            if(maxX == null || x > maxX) maxX = x;
            if(minY == null || y < minY) minY = y;
            if(maxY == null || y > maxY) maxY = y;
        };

        self.doesTileFit = function(x, y, tile){
            if(x> maxX && x-minX > totalX)
                return false;
            if(y> maxY && y-minY > totalY)
                return false;
            if(self.getTile(x,y) == undefined || self.getTile(x,y) == tile)
                    return true;
            return false;
        };

        self.doesSectionFit = function(section, x, y){
            if(Array.isArray(section.map)==false)
                throw "Map.doesSectionFit requires section to be an array of tiles.";
            var itDoes = true;
            var tX = x;
            var tY;
            section.map.forEach(function(xGroup){
                tY = y;
                xGroup.forEach(function(tile){
                    if(typeof(tile)=="number" && isFinite(tile))

                    if(self.doesTileFit(tX, tY, tile) === false)
                        itDoes = false;
                    tY++;
                });
                tX++;
            });
            return itDoes;
        };

        self.registerSectionInGraph = function(section, xOrigin, yOrigin){
            if(Array.isArray(section.map)==false)
                throw "Map.doesSectionFit requires section to be an array of tiles.";
            section.map.forEach(function(xGroup, x){
                xGroup.forEach(function(tile, y){
                    if(self.getTile(x,y))
                        console.log('Overwriting tile: '+x+', '+y);
                    self.setTile(x,y, tile);
                });
            });
        };

        self.addSection = function(section, x, y){
            //if(!(section instanceof Section.Base))
            //    throw "addSection must take a Section";
            if(self.doesSectionFit(section,x,y)===false)
                return false;
            self.registerSectionInGraph(section, x, y);
            sections.push(section);
            return true;
        };

        self.renderAscii = function(){
            var output = '';
            for(var x=minX; x<=maxX; x++){
                var xGroup = graph[x];
                for(var y=minY; y<=maxY; y++) {
                    if(xGroup && xGroup[y])
                        output+=xGroup[y].render();
                    else
                        output+='?';
                }
                output+='\r\n';
            }
            return output;
        };

        return self;
    };

    return map;
})();