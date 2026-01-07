import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//package org.peterabiodun.proofofconceptconfigurablemodules.controller.staticresources;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//@Controller
//@RequestMapping("/app")
//public class StaticResourceController {
//
//    @RequestMapping("/**")
//    public String forward() {
//        return "forward:/index.html";
//    }
//@Controller
//public class FrontendFallback {
//
//    @RequestMapping(
//            value = {
//                    "/{path:^(?!api|static|assets|favicon\\.ico|logo\\.png).*$}",
//                    "/**/{path:^(?!api|static|assets|favicon\\.ico|logo\\.png).*$}"
//            },
//            method = RequestMethod.GET
//    )
//    public String forwardToIndex() {
//        return "forward:/index.html";
//    }
//}
//}