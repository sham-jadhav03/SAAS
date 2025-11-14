import { webContainer } from '@webcontainer/api';

let webContainerInstance = null;

export const getWebContainer = async () => {
    if( webContainerInstance === null ) {
        webContainerInstance = await webContainer.boot();
    }

    return webContainerInstance;
}