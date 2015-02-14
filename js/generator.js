var Generator = (function(){
    var self = {};

    var genEntrance = function(map){
        var variationList = [];
        for(var i=0; i< SectionData.Entrance.length; i++)
            variationList.push(i);
        variationList.randomize();
        var success = false;
        while(variationList.length > 0 && success == false)
        {
            var variation = variationList[Random.int(variationList.length)];
            variationList.remove(variation);
            var entrance = new Section.Entrance(variation);
            success = map.addSection(entrance,32,32);
        }
    };


    self.generateMap = function(x,y){
        var map = new Map(x,y);

        genEntrance(map);

        return map;
    };

    return self;
})();
