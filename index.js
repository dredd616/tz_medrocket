import { renderUsersList } from './src/js-modules/render-functions.js';
import { setupUserListeners } from './src/js-modules/listener-functions.js';
import { renderCatalog, renderFavorites } from './src/js-modules/listener-functions.js';
import { nodes } from './src/js-modules/nodes.js';
import { Tooltip } from './src/js-modules/tooltip.js';
import { Loader } from './src/js-modules/loader.js';


const start = async () => {
    Tooltip.init()
    Loader.init()

    Loader.show()
    await renderUsersList()
    setupUserListeners()
    Loader.hide()
    
    nodes.menuButtonCatalog.addEventListener('click', renderCatalog)
    nodes.menuButtonFavorites.addEventListener('click', renderFavorites)
}


start()
