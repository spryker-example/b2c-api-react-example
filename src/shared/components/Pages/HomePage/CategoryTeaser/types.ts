import {WithStyles} from '@material-ui/core/styles/withStyles';
import {ICategoriesTeasersData} from "src/shared/components/Pages/HomePage/types";
import {categoryTeaserStyles} from "./styles";


export interface ICategoryTeaserProps extends WithStyles<typeof categoryTeaserStyles> {
  title: ICategoriesTeasersData["title"];
  text: ICategoriesTeasersData["text"];
  img: ICategoriesTeasersData["img"];
  path: ICategoriesTeasersData["path"];
  linkTitle: ICategoriesTeasersData["linkTitle"];
  isOdd: boolean;
}
