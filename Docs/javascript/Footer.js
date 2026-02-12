const footer = document.getElementById('footer')
footer.innerHTML = `
    <footer class="bg-gray-50 md:p-10 p-5 py-10 md:py-16 ">

        <div class="fle x hidden items-center justify-center flex-col gap-5">
            <ul class="space-y-2 flex gap-x-10 gap-y-4 justify-center items-center flex-wrap">
                <li><a href="/index.html" class="hover:opacity-60 transition-all duration-500 ">
                        Home</a></li>
                <li><a href="/about.html" class="hover:opacity-60 transition-all duration-500 ">
                        About</a></li>
                <li><a href="/case-reports.html" class="hover:opacity-60 transition-all duration-500 ">
                        Case Reports</a></li>
                <li><a href="/treatments.html" class="hover:opacity-60 transition-all duration-500 ">
                        Treatments</a></li>
                <li><a href="/testimonials.html" class="hover:opacity-60 transition-all duration-500 ">
                        Testimonials</a></li>
                <li><a href="/publications.html" class="hover:opacity-60 transition-all duration-500 ">
                        Publications</a></li>
                <li><a href="/fees.html" class="hover:opacity-60 transition-all duration-500 ">
                        Fees</a></li>
                <li><a href="/contact.html" class="hover:opacity-60 transition-all duration-500 ">
                        Contact</a></li>
            </ul>
        </div>

        <div
            class=" max-w-7xl w-full md:items-start items-center mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">

            <div class="">
                <img src="https://drwang.ca/Docs/Assets/home/map.jpg" data-aos="fade" class="w-full " alt="">
            </div>

            <div class="flex flex-col items-center justify-center gap-2 ">
                <a href="/index.html" class="">
                    <img src="/Docs/Assets/main-logo.png" class="h-10 imgAppear" alt="">
                </a>
                <p class="text-gray-700 my-2 default">15532 92A Ave, Surrey B.C</p>
                <a href="tel:+6048323568"
                    class="text-[#59312c] default block bg-white rounded-full py-1 px-3 border w-48 text-center">TEL.
                    604 832 3568</a>
                <p class="text-gray-700 default my-2">tcmclinic12@gmail.com</p>
                <p class="text-gray-700 text-center default">Clinic hours: <br>
                    7 days/week Including Holidays
                    10:30am-6pm </p>
            </div>

            <div class="flex flex-col items-center justify-center gap-2 ">

                <div data-aos="zoom-in" class="flex mb-5 items-center justify-center">
                    <a href="https://g.co/kgs/BKFu5jV "
                        target="_blank"
                        class="flex items-center space-x-3 hover:opacity-70 transition-all duration-500">
                        <!-- Google Logo -->
                        <img src="./Docs/Assets/home/Google__G__logo.svg.png" alt="Google logo"
                            class="w-6 imgAppear h-6">

                        <!-- Review Info -->
                        <div class="text-sm text-gray-800 mt-2">
                            <div class="flex items-center space-x-1">
                                <!-- Star Icons -->
                                <div class="flex text-yellow-400">
                                    ★★★★★
                                </div>
                                <span class="font-semibold text-gray-900">4.8</span>
                                <span class="text-gray-500 text-xs">(43 reviews)</span>
                            </div>
                            <span class="underline text-blue-600">Read our Google Reviews</span>
                        </div>
                    </a>
                </div>
                <a href="/index.html" class="">
                    <img src="/Docs/Assets/home/award-2017-orange.png" data-aos="fade" class="md:h-52 w-full"
                        alt="">
                </a>
            </div>
        </div>
    </footer>
    <div
        class="w-full mx-auto text-white  bg-[#59312c] p-5 flex items-center justify-center gap-4 text-center flex-col text-gray-700 ">
        <p class="text-sm">Copyright  © Dr.Chun-Kai Jason Wang Surrey Acupuncture and Chinese Medicine, 2011-2024. All
            Rights Reserved. </p>
    </div>
`