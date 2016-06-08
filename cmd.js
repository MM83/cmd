function CMD(){
    
    var models = {}, views = {}, commands = {}, osd = [];
    var msgListeners = {}, cmdListeners = {};
    
    
    this.addModel = function(name, model){
        return (models[name] = new model());
    };
    
    this.getModel = function(name){
        return models[name];
    };
    
    this.addView = function(name, view){
        views[name] = new view();
    };
    
    this.getView = function(name){
        return views[name];
    };
    
    this.addCommand = function(name, cmd){
        commands[name] = cmd;
    };
    
    this.getCommand = function(name){
        return commands[name];
    };
    
    this.sendMessage = function(name, data){
        var arr = listeners[name];
        if(!arr)
            return;
        for(var i in arr){
            arr[i](data);
        }
    };
    
    this.listenMessage = function(name, handler){
        (msgListeners[name] = msgListeners[name] || []).push(handler);
    };
    
    this.ignoreMessage = function(name, handler){
        var arr = msgListeners[name];
        if(!arr)
            return;
        var i = arr.indexOf(handler);
        if(i == -1)
            return;
            arr.splice(i, 1);
    }
    
    this.listenCommand = function(name, handler){
        (cmdListeners[name] = cmdListeners[name] || []).push(handler);
    };
    
    this.ignoreCommand = function(name, handler){
        var arr = cmdListeners[name];
        if(!arr)
            return;
        var i = arr.indexOf(handler);
        if(i == -1)
            return;
            arr.splice(i, 1);
    };
    
    this.exec = function(name, data){
        commands[name](data);
        var arr = cmdListeners[name];
        if(!arr)
            return;
        for(var i in arr)
            arr[i](data);
        
    };
    
    this.addOnStartDef = function(func){
        osd.push(func);
    };
    
    this.start = function(startData){
        var i, o;
        for(i in views){
            o = views[i];
            if(o.onStart)
                o.onStart(startData);
        }
        for(i in models){
            o = models[i];
            if(o.onStart)
                o.onStart(startData);
        }
        for(i in osd)
            osd[i](startData);
    };
    
};
