// -- Dummy ----------
// A dummy snippet to stop and resume the code.

Snippet.register('Dummy', (function(){
    class DummySnippet extends SynkSnippet
    {
        main(){
            this.return('DUMMY');
        }
    }
    return DummySnippet;
})());

// -- Delay ----------
// A simple delay which cause the function to sleep and wake up.

Snippet.register('Delay', (function(){
    class DelaySnippet extends SynkSnippet
    {
        main(interval){
            setTimeout(function(self){
                self.return();
            }, interval, this);
        }
    }
    return DelaySnippet;
})());

// -- Call -----------
// A snippet to call other asynchornous generator functions synchronously.

Snippet.register('Call', (function(){
    class CallSnippet extends SynkSnippet
    {
        main(func, args){
            this.synk.run(func, args);
            this.return(Snippet.unset);
        }
    }
    return CallSnippet;
})());

// -- ReadKey --------
// A snippet to emulate the old Pascal ReadKey blocking function.

Snippet.register('ReadKey', (function(){
    class ReadKeySnippet extends SynkSnippet
    {
        main(options){
            var self = this;
            options = options || {};
            this.snippet.listener = function(event){
                if (! options.trapallkeys)
                {
                    if ((event.which === 116) || (event.which === 122) || (event.which === 123))
                        return true;
                }

                document.body.removeEventListener('keydown', self.snippet.listener, true);
                event.preventDefault();
                event.stopPropagation();
                self.snippet.callback.apply(self, [event.which]);
                return false;
            }

            document.body.addEventListener('keydown', this.snippet.listener,true);
        }

        callback(keyCode){
            this.return(keyCode);
        }
    }
    return ReadKeySnippet;
})());

// -- DomEvent -------
// A snippet which awaits for a DOM Event.

Snippet.register('DomEvent', (function(){
    class DomEventSnippet extends SynkSnippet
    {
        main(eventName, element, options){
            var self = this;
            options = options || {};
            if (! (element instanceof HTMLElement))
                element = document.querySelector(element);

            this.snippet.listener = function(event){
                element.removeEventListener(eventName, self.snippet.listener);

                if (options.preventDefault)
                {
                    event.preventDefault();
                    event.stopPropagation();
                }
                self.snippet.callback.apply(self, [event]);
            }

            try
            {
                element.addEventListener(eventName, this.snippet.listener);
            } catch(e)
            {
                console.error('Expected HTMLElement ',element,'given');
                throw e;
            }
        }

        callback(keyCode){
            this.return(keyCode);
        }
    }
    return DomEventSnippet;
})());