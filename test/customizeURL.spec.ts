import customizeURL from "../src/background/customizeURL";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);

describe("Function customizeURL", () => {
  describe("from tab", () => {
    it("should replace desktopURL with mobileURL of Naver", () => {
      expect(customizeURL("https://www.naver.com", false)).to.equal("https://m.naver.com");
    });
    it("should replace desktopURL with mobileURL of Naver Search", () => {
      expect(customizeURL("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=Whale+Browser+Sync", false)).to.equal("https://m.search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=Whale+Browser+Sync");
    });
    it("should replace desktopURL with mobileURL of Naver Shopping Search", () => {
      expect(customizeURL("https://search.shopping.naver.com/search/all.nhn?query=vitamin", false)).to.equal("https://msearch.shopping.naver.com/search/all?query=vitamin");
    });
    it("should replace desktopURL with mobileURL of Naver Place", () => {
      expect(customizeURL("https://store.naver.com/restaurants/detail?id=1728162345", false)).to.equal("https://m.place.naver.com/restaurant/1728162345");
    });
    it("should replace desktopURL with mobileURL of Naver Reservation", () => {
      expect(customizeURL("https://booking.naver.com/booking/13/bizes/222724?area=plt", false)).to.equal("https://m.booking.naver.com/booking/13/bizes/222724?area=plt");
    });
    it("should replace desktopURL with mobileURL of Naver Blog", () => {
      expect(customizeURL("https://blog.naver.com/PostList.nhn?blogId=naver_diary", false)).to.equal("https://m.blog.naver.com/PostList.nhn?blogId=naver_diary");
    });
    it("should replace desktopURL with mobileURL of Naver QnA", () => {
      expect(customizeURL("https://kin.naver.com/qna/detail.nhn?d1id=8&dirId=80101&docId=353771577", false)).to.equal("https://m.kin.naver.com/mobile/qna/detail.nhn?d1id=8&dirId=80101&docId=353771577");
    });
    it("should replace desktopURL with mobileURL of Naver Pay", () => {
      expect(customizeURL("https://order.pay.naver.com/home", false)).to.equal("https://m.pay.naver.com/o/home");
    });
    it("should replace desktopURL with mobileURL of Naver Vlive", () => {
      expect(customizeURL("https://www.vlive.tv/home", false)).to.equal("https://m.vlive.tv/home");
    });
    it("should replace desktopURL with mobileURL of Daum", () => {
      expect(customizeURL("https://www.daum.net/", false)).to.equal("https://m.daum.net/");
    });
    it("should replace desktopURL with mobileURL of Daumsearch", () => {
      expect(customizeURL("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=naver", false)).to.equal("https://m.search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=naver");
    });
    it("should replace desktopURL with mobileURL of Coupang", () => {
      expect(customizeURL("https://www.coupang.com/", false)).to.equal("https://m.coupang.com/");
    });
    it("should replace desktopURL with mobileURL of Facebook", () => {
      expect(customizeURL("https://www.facebook.com/", false)).to.equal("https://m.facebook.com/");
    });
    it("should replace desktopURL with mobileURL of Youtube", () => {
      expect(customizeURL("https://www.youtube.com/", false)).to.equal("https://m.youtube.com/");
    });
    it("should not replace the other URLs", () => {
      const url = "http://phenomenon.kr"
      expect(customizeURL(url, false)).to.equal(url);
    });
  });

  describe("from sidebar", () => {
    it("should replace mobileURL with desktopURL of Naver", () => {
      expect(customizeURL("https://m.naver.com", true)).to.equal("https://www.naver.com");
    });
    it("should replace mobileURL with desktopURL of Naver Search", () => {
      expect(customizeURL("https://m.search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=Whale+Browser+Sync", true)).to.equal("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=Whale+Browser+Sync");
    });
    it("should replace mobileURL with desktopURL of Naver Shopping Search", () => {
      expect(customizeURL("https://msearch.shopping.naver.com/search/all?query=vitamin", true)).to.equal("https://search.shopping.naver.com/search/all.nhn?query=vitamin");
    });
    it("should replace mobileURL with desktopURL of Naver Place", () => {
      expect(customizeURL("https://m.place.naver.com/restaurant/1728162345", true)).to.equal("https://store.naver.com/restaurants/detail?id=1728162345");
    });
    it("should replace mobileURL with desktopURL of Naver Reservation", () => {
      expect(customizeURL("https://m.booking.naver.com/booking/13/bizes/222724?area=plt", true)).to.equal("https://booking.naver.com/booking/13/bizes/222724?area=plt");
    });
    it("should replace mobileURL with desktopURL of Naver Blog", () => {
      expect(customizeURL("https://m.blog.naver.com/PostList.nhn?blogId=naver_diary", true)).to.equal("https://blog.naver.com/PostList.nhn?blogId=naver_diary");
    });
    it("should replace mobileURL with desktopURL of Naver QnA", () => {
      expect(customizeURL("https://m.kin.naver.com/mobile/qna/detail.nhn?d1id=8&dirId=80101&docId=353771577", true)).to.equal("https://kin.naver.com/qna/detail.nhn?d1id=8&dirId=80101&docId=353771577");
    });
    it("should replace mobileURL with desktopURL of Naver Pay", () => {
      expect(customizeURL("https://m.pay.naver.com/o/home", true)).to.equal("https://order.pay.naver.com/home");
    });
    it("should replace mobileURL with desktopURL of Naver Vlive", () => {
      expect(customizeURL("https://m.vlive.tv/home", true)).to.equal("https://www.vlive.tv/home");
    });
    it("should replace mobileURL with desktopURL of Daum", () => {
      expect(customizeURL("https://m.daum.net/", true)).to.equal("https://www.daum.net/");
    });
    it("should replace mobileURL with desktopURL of Daumsearch", () => {
      expect(customizeURL("https://m.search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=naver", true)).to.equal("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=naver");
    });
    it("should replace mobileURL with desktopURL of Coupang", () => {
      expect(customizeURL("https://m.coupang.com/", true)).to.equal("https://www.coupang.com/");
    });
    it("should replace mobileURL with desktopURL of Facebook", () => {
      expect(customizeURL("https://m.facebook.com/", true)).to.equal("https://www.facebook.com/");
    });
    it("should replace mobileURL with desktopURL of Youtube", () => {
      expect(customizeURL("https://m.youtube.com/", true)).to.equal("https://www.youtube.com/");
    });
    it("should not replace the other URLs", () => {
      const url = "http://phenomenon.kr"
      expect(customizeURL(url, false)).to.equal(url);
    });
  });
});