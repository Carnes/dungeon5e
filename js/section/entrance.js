var Section = Section || {};

Section.Entrance = (function(){

    var section = function(variationNumber){
        var self = this;
        self.map=[];
        self.variation = Data.Entrance[variationNumber];
        if(!self.variation)
            throw 'Cannot create Entrance '+variationNumber;
        self.potentialDoorCount = 0;
        self.potentialDoorLocations = [];
        self.unconnectedDoors = [];
        self.connectedDoors = [];
        self.potentialPassages = [];
        self.unconnectedPassages = [];
        self.setUnconnectedDoors();
        self.setUnconnectedPassages();
        self.createMap(self.variation.map);
    };

    section.prototype = new SectionBase();

    return section;
})();