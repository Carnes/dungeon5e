var Map = (function(){
    var map = function(totalX, totalY){
        var self = this;

        var sections = [];
        var minX = null;
        var minY = null;
        var maxX = null;
        var maxY = null;

        var graph = [[]];

        self.doesTileFit = function(tileType, x, y){
            var tMinX = minX;
            var tMinY = minY;
            var tMaxX = maxX;
            var tMaxY = maxY;
            if(tMinX == null || x < tMinX) tMinX = x;
            if(tMaxX == null || x > tMaxX) tMaxX = x;
            if(tMinY == null || y < tMinY) tMinY = y;
            if(tMaxY == null || y > tMaxY) tMaxY = y;

            if(graph[x][y] == undefined || graph[x][y] == tileType)
                if(tMaxX - tMinX <= totalX && tMaxY - tMinY <= totalY)
                    return true;
            return false;
        };

        self.doesSectionFit = function(section, x, y){
            if(Array.isArray(section)==false)
                throw "Map.doesSectionFit requires section to be an array of tiles.";
            var itDoes = true;
            var tX = x;
            var tY;
            section.forEach(function(xGroup){
                tY = y;
                xGroup.forEach(function(tile){
                    if(typeof(tile)=="number" && isFinite(tile))

                    if(self.doesTileFit(tile,tX, tY) === false)
                        itDoes = false;
                    tY++;
                });
                tX++;
            });
            return itDoes;
        };

        self.addSection = function(section){
            //if(!(section instanceof Section.Base))
            //    throw "addSection must take a Section";
            sections.push(section);
            return section;
        };

        self.render = function(){
            var str = '';
            sections.forEach(function(s){
                var rows = s.render();
                rows.forEach(function(line){
                    str+=line+'\r\n';
                });
            });
            return str;
        };

    };
    return map;
})();