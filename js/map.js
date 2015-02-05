var Map = (function(){
    var map = function(){
        var self = this;

        var sections = [];

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