import Button from '@/components/common/Button/Button';
import Image from '@/components/common/Image/Image';
import Modal from '@/components/common/Modal/Modal';
import ProductAddCart from '@/components/product/ProductAddCart/ProductAddCart';
import { ProductType } from '@/domain/product';
import { useExcludeCart } from '@/hooks/useExcludeCart';
import { useModal } from '@/hooks/useModal';
import useResponsive from '@/hooks/useResponsive';
import * as Styled from './ProductDetailCard.style';

function ProductDetailCard({ product }: { product: ProductType }) {
  const responsive = useResponsive();
  const { isShowModal, openModal, closeModal } = useModal();
  const isShowCartButton = useExcludeCart(product.id);

  const onClickCartAddButton = () => {
    openModal();
  };

  return (
    <>
      <Styled.InformationWrapper>
        <Image
          src={(product as any).imageURL}
          alt=""
          width={responsive === 'desktop' ? '400px' : '250px'}
        />
        <Styled.Name>{(product as any).name}</Styled.Name>
        <Styled.Price>
          <span>금액 </span>
          <span>{(product as any).price.toLocaleString('ko-KR')}원</span>
        </Styled.Price>
      </Styled.InformationWrapper>

      {isShowCartButton && (
        <Styled.ButtonWrapper onClick={onClickCartAddButton}>
          <Button width="100%" padding="20px">
            장바구니
          </Button>
        </Styled.ButtonWrapper>
      )}

      {isShowModal && (
        <Modal closeModal={closeModal}>
          <ProductAddCart product={product} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default ProductDetailCard;
