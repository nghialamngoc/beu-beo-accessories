import clsx from 'clsx'
import Link from '../Link'
import topNavigationData from '@/dummy/top-navigation.json'

export const Footer = () => {
  const categories = topNavigationData

  return (
    <div>
      <div className="bg-gray-200 px-16 md:px-0">
        <div className="mx-auto max-w-screen-xl grid lg:grid-cols-3 gap-20 md:gap-40 py-20">
          <div>
            <h4 className="font-semibold">LIÊN HỆ</h4>
            <div className="flex flex-col gap-4 text-14 mt-10 md:mt-20">
              <p className="font-medium">Địa chỉ:</p>
              <p>- Tầng 2, 284/35 Lý Thường Kiệt, phường 14, quận 10, Thành phố Hồ Chí Minh</p>
              <p>- Tầng 3, 8 Đường số 3, Phường 11, Quận 6, Thành phố Hồ Chí Minh</p>
            </div>

            <div className="flex flex-col gap-4 text-14 mt-10 md:mt-20">
              <p className="font-medium">Điện thoại, Zalo:</p>
              <p>- 0367765209</p>
              <p>- 0348642645</p>
            </div>

            <div className="flex flex-col gap-4 text-14 mt-10 md:mt-20">
              <p className="font-medium">Giờ làm việc:</p>
              <p>- 08:30 - 18:00 (từ thứ 2 đến thứ cn)</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">DANH MỤC</h4>
            <div className="mt-10 md:mt-20">
              {categories.map((item, index) => {
                return (
                  <div key={index}>
                    <Link
                      {...item}
                      prefetch={true}
                      className={clsx(
                        'flex w-fit items-center font-medium text-14 py-10 ',
                        'hover:text-primary active:text-primary'
                      )}
                    >
                      - {item.title}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Bếu Béo Accessories trên Facebook</h4>
            <div className="mt-10 md:mt-20">
              <div
                className="fb-page"
                data-href="https://www.facebook.com/beobeo.accessories"
                data-tabs=""
                data-width=""
                data-height="400"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="false"
              >
                <blockquote cite="https://www.facebook.com/beobeo.accessories" className="fb-xfbml-parse-ignore">
                  <a href="https://www.facebook.com/beobeo.accessories">Bếu Béo Accessories</a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 text-white px-16 md:px-0">
        <div className="mx-auto max-w-screen-xl text-14 py-10">Copyright 2024 © nghialamngocit@gmail.com</div>
      </div>
    </div>
  )
}
