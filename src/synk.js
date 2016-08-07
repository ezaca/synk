/**
 * Synk
 */

class Synk
{
    constructor(func, args)
    {
        this.stack = [];
        this.shared = {};

        if (arguments.length > 0)
            this.run(func, args);
    }

    stackTop(){
        return this.stack[this.stack.length-1];
    }

    run(func, args)
    {
        let context = new SynkContext(this);
        let gen = func.apply(context, args);
        this.stack.push(gen);
        this.continue();
    }

    continue()
    {
        if (this.stack.length <= 0)
            return;
        if (this.stackTop() instanceof SynkSnippet)
            return;

        let res = this.stackTop().next();
        if (res.done)
        {
            this.return(res.value);
            return;
        }

        if (res.value instanceof SynkSnippet)
        {
            this.stack.push(res.value);
            let context = new SynkContext(this);
            context.snippet = res.value;
            res.value.run(context);
        } else
        {
            this.continue();
        }
    }

    return(value)
    {
        if (value !== Snippet.unset)
            this.shared.result = value;

        this.stack.pop();
        this.continue();
    }
}

/**
 * SynkSnippet
 */

class SynkSnippet
{
    constructor(){
        this.args = arguments;
    }
    main(){} // Abstract
    run(context){
        this.main.apply(context,this.args);
    }
}

/**
 * Snippets
 */

Snippet = {
    register: function(name, ref){
        this[name] = ref;
    },

    unset: Symbol('unset'),
}

/**
 * SynkContext
 */

class SynkContext
{
    constructor(synk){
        this.synk = synk;
        this.shared = synk.shared;
        this.snippet = undefined;
    }

    get result(){
        return this.shared.result;
    }

    return(value)
    {
        this.synk.return(value);
        this.synk.continue();
    }

    call(func, args)
    {
        return new Snippet.Call(func, args);
    }
}