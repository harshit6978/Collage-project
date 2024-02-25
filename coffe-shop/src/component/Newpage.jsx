import React from 'react'
import "./../index.css"
import master from "../assets/mastershef.png"
import schef from "../assets/chef logo.png"
import side from "../assets/side.png"
const Newpage = () => {
    return (
        <section class="section-padding position-re">
            <div class="containeri">
                <div class="row">
                    <div class="col-5 padd">
                        <div>
                            <img src={master} class="image" />
                        </div>
                    </div>

                    <div class="col-5 padd valign offset">
                        <div>
                            <h3 class="fz-50 mb-30">
                                <span class="fw-200">Masterchef</span>message
                            </h3>
                            <h5 class="mb-10">First we eat, then we do<br />
                                everything else.
                            </h5>
                            <p class="fz-18">And for me that moment of discovery is just so thrilling, on any level, that I think anybody that’s experienced it is pretty quickly addicted to it.</p>

                            <div class="signature">
                                <img src={schef} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={side} class="img-out" />
        </section>
    )
}

export default Newpage