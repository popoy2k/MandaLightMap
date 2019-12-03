import React, { Component, Fragment } from "react";

import SidePanel from "./SidePanel";
import NavBar from "../main/NavBar";
import PanelHeader from "./header";

export class WNV extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <PanelHeader />
        <div className="main-panel">
          <SidePanel />
          <div className="article-panel">
            <span className="article-title">West Nile Virus</span>
            <p>
              The study published in Proceedings of the Royal Society B
              concludes infected house sparrows living in light polluted
              conditions remain infectious for two days longer than those who do
              not, enhancing their host competence, or propensity to generate
              infection in other hosts or vectors. In turn, mathematical models
              show these likely increases the potential for a WNV outbreak by
              about 41 percent. <br />
              <br /> According to lead author Meredith Kernbach, PhD student in
              the University of South Florida College of Public Health, that
              light pollution can affect the spread of zoonotic diseases.
              Researchers studied 45 house sparrows, exposing half to artificial
              light at night. Following 7-25 days in captivity, the team exposed
              the birds to WNV and took blood samples 2, 4, 6, and 10 days
              post-exposure. Researchers found all birds were infected within
              2-4 days, however after that, birds exposed to light at night
              maintained transmissible burdens of WNV. <br />
              <br /> According to Kernbach, they picked the little brown birds
              since they live in close proximity to humans in urban areas, play
              host to a number of parasites and diseases, and are frequent
              carriers of WNV. While birds exposed to light pollution remain
              infected for a longer period of time, this did not increase
              mortality rates. <br />
              <br /> These results follow a previous study led by the University
              of South Florida that found zebra finches that have the avian
              stress hormone corticosterone (CORT) are more susceptible to
              mosquito bites. Such stress is known to be caused by a number of
              factors such as road noise, pesticides and light pollution.
              Researchers suggest new lighting technologies be created that are
              detectable to humans, but not for wildlife. <br />
              <br /> West Nile virus (WNV) is a mosquito-borne infection that is
              transmitted to humans by mosquito (Kramer LD, et al., 2007), and
              it is considered as a causative agent of the illness that
              represents a major public-health problem worldwide (Granwehr BP,
              et al., 2004). In 1937, WNV was first isolated from a patient’s
              blood in the West Nile region of Uganda (Smithburn K, et al,
              1940). Then, the virus is extensively distributed in Mediterranean
              region, Africa, Asia, and east Europe (Murgue B, et al., 2001;
              Tsai TF, et al., 1998), and in 1999 it appeared in New York (Nash
              D, et al., 2001), rapidly spread across the USA, Mexico, Canada,
              and the Caribbean (Huhn GD, et al., 2002). <br />
              <br /> Although the majority of individuals exposed to WNV have
              asymptomatic or mild infection such as fever and headache, less
              than 1% of these cases can present with neurological diseases,
              which includes West Nile poliomyelitis, West Nile encephalitis and
              West Nile meningitis (Patel H, et al., 2015). On the other hand, a
              lack of an effective prophylactic vaccine or antiviral therapy may
              lead to more outbreaks of WNV infection. <br />
              <br /> Recently, bibliometric tools have been widely used to
              investigate the worldwide contributions in many infectious
              diseases related research including Ebola (Yi F, et al., 2015),
              dengue (Zyoud SH, 2015), John Cunningham virus (Zheng HC, et al.,
              2009), tuberculosis (Groneberg DA, et al., 2015), leishmaniasis
              (Ramos JM, et al, 2010), Zika virus (Martinez-Pulgarin DF, et al.,
              2016), Mayaro virus fever (Patiño-Barbosa A, et al., 2015), yellow
              fever disease (Bundschuh M, et al., 2013), Malaria (Lewison G, et
              al 2008; Sweileh WM, et al 2015), toxocariasis ( Zyoud SH, 2017),
              campylobacteriosis (Sweileh WM, et al., 2016), and Middle East
              respiratory syndrome coronavirus (Zyoud SH, 2016). <br />
              <br /> Research productivity in WNV field, however, has not been
              reported to date. The aims of this study are to bibliometrically
              analyze the quantity and quality of publications indexed in Scopus
              from different countries to reveal the characteristics of global
              research output regarding WNV, and to determine the main research
              topics related to WNV over time. <br />
              <br /> Findings from this study will provide a holistic picture on
              WNV-related research which serves as a useful reference for future
              studies. Furthermore, it gives a picture for authors and editorial
              journals about future research direction. <br />
              <br /> West Nile virus (WNV) is an arthropod-borne virus
              (arbovirus) belonging to the genus Flavivirus, family Flaviviridae
              (Mackenzie JS, et al 2002). The virus is maintained in nature
              through a bird-mosquito-bird transmission cycle, but mosquitoes
              can transmit the virus to nonamplifying hosts, such as horses and
              humans, which do not develop high levels of viremia (Komar N, et
              al., 2003; Turrell MJ,et al., 2002; Bunning ML, et al., 2002). In
              temperate climates, risk of human infection with WNV rises during
              midsummer to late summer when the number of infected mosquitoes
              that feed on humans increases. <br />
              <br /> The virus was first isolated in 1937 from the blood of a
              febrile patient in the West Nile province of Uganda (Smithburn KC
              , et al., 1940). Since arriving in North America in 1999, WNV has
              spread throughout the United States and Canada and into Mexico and
              the Caribbean (Drebot MA, et al., 2003). The virus has emerged as
              a globally important pathogen with far-reaching implications for
              public health.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default WNV;
