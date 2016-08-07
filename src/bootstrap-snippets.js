// -- BsShowModal ----
// Show a Bootstrap modal and awaits it to close.
// Requires: JQuery [1/2/3/compatible], Bootstrap [3/compatible]

Snippet.register('BsShowModal', (function(){
    class BsShowModalSnippet extends SynkSnippet
    {
        main(selector, options){
            var self = this;
            options = options || {};
            this.snippet.closeListener = function(){
                $(selector).off('hidden.bs.modal', self.snippet.closeListener);
                self.return();
                return false;
            }

            $(selector).on('hidden.bs.modal', this.snippet.closeListener);
            $(selector).modal(options);
        }
    }
    return BsShowModalSnippet;
})());