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
              Consequatur. Quos, at excepturi corporis quam ipsa quaerat
              doloremque, ab, quasi molestiae dicta voluptates voluptate. Dicta
              corporis itaque, nulla voluptate possimus perferendis accusantium
              enim facilis vero reiciendis cum animi minus similique? Officiis
              tempora error amet voluptatibus cum aliquid repudiandae voluptas
              distinctio. Accusamus autem maxime placeat quia nam consequatur
              iste maiores architecto! Numquam quisquam ad blanditiis quia
              dolores autem velit quibusdam facilis? Obcaecati, reiciendis unde
              illum nulla sequi ipsa expedita voluptates natus explicabo modi
              dolorem amet quas ipsum dignissimos corrupti voluptas possimus
              tempore ducimus tenetur repellendus nostrum odit, vitae vero?
              Obcaecati, ratione! Possimus nemo officiis mollitia nostrum
              voluptatem iste corrupti, porro dolores accusamus a, culpa animi.
              Veniam dolor autem temporibus, illum alias nihil itaque tenetur
              qui perspiciatis, perferendis quas doloremque, earum magnam!
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default intro;
