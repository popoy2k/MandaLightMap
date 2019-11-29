import React, { Component, Fragment } from "react";
import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";
export class intro extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">Introduction</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              voluptatibus neque, a iste natus nihil excepturi, alias nisi vitae
              exercitationem molestias similique quia, provident ad. Sequi
              excepturi quis tempore aspernatur? Totam molestias laudantium nam
              nostrum non! Totam voluptas delectus esse, sint, harum excepturi
              debitis, tempore omnis sequi dolor aperiam officia nesciunt hic
              doloribus cum iure tenetur illo. Aliquam, consequatur. A? A odio
              nesciunt non, explicabo iste maxime, facilis in eum eos sed ex.
              Laborum cupiditate ipsa voluptatibus libero, ad deserunt deleniti
              natus voluptatem amet beatae reiciendis, fugit modi quod
              voluptate? Iste numquam expedita, necessitatibus quos
              exercitationem accusantium optio, nesciunt sequi ab quis sit autem
              itaque beatae animi nam est cumque quam odio incidunt, impedit
              quibusdam nisi facilis iure dignissimos! Rerum! Recusandae iure
              eius, accusamus maiores sed hic minima magnam sint deleniti!
              Laboriosam blanditiis tempore explicabo adipisci aut fugiat
              reiciendis perferendis eius, numquam officiis nisi deserunt
              inventore eaque autem libero mollitia. Nisi, laboriosam tenetur
              magni veniam voluptatum dolores maxime vitae cum quidem libero.
              Doloremque, unde error dolorum numquam exercitationem ea autem
              illum consequuntur id! Aliquam molestiae culpa officiis sunt eos.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque quo obcaecati facere quam quidem dolor temporibus
              similique dignissimos impedit. Similique voluptate nisi omnis
              nesciunt laborum, modi nam consequuntur sint rerum? Animi minima
              accusantium explicabo optio et dolorem reiciendis praesentium in
              consectetur modi debitis voluptatum veniam ipsam possimus fugiat
              fugit nemo rem libero esse illo, repellendus quidem molestias!
              Cum, aspernatur aperiam. Perferendis eum, quasi possimus numquam
              vel velit molestiae, voluptatum doloribus illo rerum vitae aliquid
              dignissimos distinctio debitis illum ducimus quisquam dolores
              natus. Soluta, odit! Ipsam doloremque repudiandae natus illo
              accusantium! Iure facilis, aliquam molestiae est quos eaque
              distinctio expedita doloribus blanditiis impedit? Suscipit
              expedita mollitia architecto, numquam ex nobis dicta odit deserunt
              perspiciatis cum consequuntur iusto, corrupti, accusantium fugit
              iste. Doloribus quasi architecto, aliquam veniam quae perferendis
              maxime sint? Quaerat velit eos asperiores aspernatur amet.
              Inventore ipsum assumenda sit vitae voluptatem quidem quibusdam
              ab? Facilis commodi error dolorem quos autem.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default intro;
