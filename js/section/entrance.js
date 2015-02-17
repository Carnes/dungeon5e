var Section = Section || {};

Section.Entrance = (function(){

    var section = function(variationNumber){
        var self = this;
        self.map=[];
        self.variation = SectionData.Entrance[variationNumber];
        if(!self.variation)
            throw 'Cannot create Entrance '+variationNumber;
        self.unconnectedDoors = [];
        self.unconnectedPassages = [];
        self.potentialDoors = [];
        self.potentialPassages = [];
        self.connectedDoors = [];
        self.setUnconnectedDoors();
        self.setUnconnectedPassages();
        self.createMap(self.variation.map);
    };

    section.prototype = new SectionBase();

    return section;
})();