import instance from "..";
import config from "@/config";
const dogUrl = config.serviceUrl.dog;
export function getUserInfo(){
    return instance.request({url:dogUrl+'/api/breeds/image/random'});
}