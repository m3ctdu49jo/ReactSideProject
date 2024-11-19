import Grid from "./Grid";
import GridViewProvider from "./GridViewProvider"


function GridView(){

    return (
        <GridViewProvider>
            <Grid />
        </GridViewProvider>
    );
}


export default GridView;   

//export { default } from "./GridView2"   //直接將預設匯出轉發