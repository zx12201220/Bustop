import JsSHA from 'jssha';
export default function getAuthorizationHeader() {
    const AppID = "3d6cd7f1884643bcb149703cf9cc138d";
    const AppKey = "Z3rwrDVIwkFSkAnUrLDLfPw2cvA";
    const GMTString = new Date().toGMTString();
    const ShaObj = new JsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update(`x-date: ${GMTString}`);
    const HMAC = ShaObj.getHMAC('B64');
    const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
    return { Authorization, 'X-Date': GMTString };
}