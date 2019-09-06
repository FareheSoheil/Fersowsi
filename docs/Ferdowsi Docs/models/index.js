import sequelize from '../sequelize';
import config from '../config'
// General Tables
import Address, { initialize as initializeAddress } from './General/Address';
import AgeGroup, { initialize as initializeAgeGroup } from './General/AgeGroup';
import Country, { initialize as initializeCountry } from './General/Country';
import Currency, { initialize as initializeCurrency } from './General/Currency';
import DeliveryType, {
  initialize as initializeDeliveryType,
} from './General/DeliveryType';
import DownloadHistory, {
  initialize as initializeDownloadHistory,
} from './General/DownloadHistory';
import GuestSubscriber, {
  initialize as initializeGuestSubscriber,
} from './General/GuestSubscriber';
import Job, { initialize as initializeJob } from './General/Job';
import PaymentStatus, {
  initialize as initializePaymentStatus,
} from './General/PaymentStatus';
import ProductLanguage, {
  initialize as initializeProductLanguage,
} from './General/ProductLanguage';
import SiteLanguage, {
  initialize as initializeSiteLanguage,
} from './General/SiteLanguage';
import Zone, { initialize as initializeZone } from './General/Zone';

// Message Tables
import Claim, { initialize as initializeClaim } from './Message/Claim';
import Comment, { initialize as initializeComment } from './Message/Comment';
import ContactUs, {
  initialize as initializeContactUs,
} from './Message/ContactUs';
import MessageStatus, {
  initialize as initializeMessageStatus,
} from './Message/MessageStatus';

// Order Tables
import Basket, { initialize as initializeBasket } from './Order/Basket';
import CustomerOrder, {
  initialize as initializeCustomerOrder,
} from './Order/CustomerOrder';
import CustomerOrderStatus, {
  initialize as initializeCustomerOrderStatus,
} from './Order/CustomerOrderStatus';
import Invoice, { initialize as initializeInvoice } from './Order/Invoice';
import PublisherOrder, {
  initialize as initializePublisherOrder,
} from './Order/PublisherOrder';
import PublisherOrderStatus, {
  initialize as initializePublisherOrderStatus,
} from './Order/PublisherOrderStatus';

// Product Tables
import DeliveryPrice, {
  initialize as initializeDeliveryPrice,
} from './Product/DeliveryPrice';
import LandingPage, {
  initialize as initializeLandingPage,
} from './Product/LandingPage';
import PackageProductContain, {
  initialize as initializePackageProductContain,
} from './Product/PackageProductContain';
import Product, {
  initialize as initializeProduct,
} from './Product/Product';
import ProductContentCategory, {
  initialize as initializeProductContentCategory,
} from './Product/ProductContentCategory';
import ProductContentTranslation, {
  initialize as initializeProductContentTranslation,
} from './Product/ProductContentTranslation';
import ProductContentType, {
  initialize as initializeProductContentType,
} from './Product/ProductContentType';
import ProductPeriod, {
  initialize as initializeProductPeriod,
} from './Product/ProductPeriod';
import ProductPeriodPrice, {
  initialize as initializeProductPeriodPrice,
} from './Product/ProductPeriodPrice';
import ProductStatus, {
  initialize as initializeProductStatus,
} from './Product/ProductStatus';
import ProductType, {
  initialize as initializeProductType,
} from './Product/ProductType';
import SingleProductType, {
  initialize as initializeSingleProductType,
} from './Product/SingleProductType';

// User Tables
import Role, { initialize as initializeRole } from './User/Role';
import User, { initialize as initializeUser } from './User/User';
import UserActivitionStatus, {
  initialize as initializeUserActivitionStatus,
} from './User/UserActivitionStatus';
import UserActivity, {
  initialize as initializeUserActivity,
} from './User/UserActivity';
import UserSubCategory, {
  initialize as initializeUserSubCategory,
} from './User/UserSubCategory';

// User Tables
Address.belongsTo(User), {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
};

Address.belongsTo(Country, {
  foreignKey: 'countryId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.belongsTo(Role, {
  foreignKey: 'roleId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.belongsTo(UserSubCategory, {
  foreignKey: 'userSubCategoryId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.belongsTo(UserActivitionStatus, {
  foreignKey: 'userActivitionStatusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.belongsTo(Currency, {
  foreignKey: 'currencyId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.belongsTo(SiteLanguage, {
  foreignKey: 'languageId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.belongsTo(Job, {
  foreignKey: 'jobId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.belongsTo(Country, {
  foreignKey: 'countryId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

UserActivity.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

// Product Tables
Product.belongsTo(ProductType, {
  foreignKey: 'productTypeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Product.belongsTo(SingleProductType, {
  foreignKey: 'singleProductTypeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Product.belongsTo(AgeGroup, {
  foreignKey: 'ageGroupId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Product.belongsTo(ProductPeriod, {
  foreignKey: 'publishPeriodId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Product.belongsTo(User, {
  foreignKey: 'publisherId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Product.belongsTo(ProductLanguage, {
  foreignKey: 'languageId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

PackageProductContain.belongsTo(Product, {
  foreignKey: 'packageProductId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

PackageProductContain.belongsTo(Product, {
  foreignKey: 'singleProductId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

LandingPage.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

ProductContentTranslation.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

ProductContentTranslation.belongsTo(ProductLanguage, {
  foreignKey: 'languageId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

ProductContentCategory.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
ProductContentCategory.belongsTo(ProductContentType, {
  foreignKey: 'productContentTypeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

ProductPeriodPrice.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

ProductPeriodPrice.belongsTo(ProductPeriod, {
  foreignKey: 'productPeriodId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

DeliveryPrice.belongsTo(ProductPeriodPrice, {
  foreignKey: 'productPeriodPriceId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

DeliveryPrice.belongsTo(Zone, {
  foreignKey: 'zoneId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

DeliveryPrice.belongsTo(DeliveryType, {
  foreignKey: 'deliveryTypeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

// Order Tables
Basket.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Basket.belongsTo(User, {
  foreignKey: 'actionUserId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Basket.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

CustomerOrder.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

CustomerOrder.belongsTo(User, {
  foreignKey: 'actionUserId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

CustomerOrder.belongsTo(Address, {
  foreignKey: 'deliveryAddressId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

CustomerOrder.belongsTo(PaymentStatus, {
  foreignKey: 'paymentToAdminByCustomerStatusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

PublisherOrder.belongsTo(CustomerOrder, {
  foreignKey: 'customerOrderId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

PublisherOrder.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

PublisherOrder.belongsTo(PaymentStatus, {
  foreignKey: 'paymentToPublisherByAdminStatusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Invoice.belongsTo(CustomerOrder, {
  foreignKey: 'customerOrderId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

DownloadHistory.belongsTo(User, {
  foreignKey: 'customerId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

DownloadHistory.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

// Message Tables

Claim.belongsTo(User, {
  foreignKey: 'senderUserId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Claim.belongsTo(User, {
  foreignKey: 'receiverUserId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Claim.belongsTo(User, {
  foreignKey: 'actionUserId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Claim.belongsTo(Claim, {
  foreignKey: 'repliedMessageId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Claim.belongsTo(CustomerOrder, {
  foreignKey: 'customerOrderId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Claim.belongsTo(MessageStatus, {
  foreignKey: 'messageStatusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Claim.belongsTo(User, {
  foreignKey: 'acceptedAdminId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Comment.belongsTo(Product, {
  foreignKey: 'productId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Comment.belongsTo(User, {
  foreignKey: 'actionUserId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Comment.belongsTo(Comment, {
  foreignKey: 'repliedCommentId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Comment.belongsTo(MessageStatus, {
  foreignKey: 'messageStatusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

const initializeDatabase = async () => {
  await initializeAddress();
  await initializeAgeGroup();
  await initializeCountry();
  await initializeCurrency();
  await initializeDeliveryType();
  await initializeDownloadHistory();
  await initializeGuestSubscriber();
  await initializeJob();
  await initializePaymentStatus();
  await initializeProductLanguage();
  await initializeSiteLanguage();
  await initializeZone();
  await initializeClaim();
  await initializeComment();
  await initializeContactUs();
  await initializeMessageStatus();
  await initializeBasket();
  await initializeCustomerOrder();
  await initializeCustomerOrderStatus();
  await initializeInvoice();
  await initializePublisherOrder();
  await initializePublisherOrderStatus();
  await initializeDeliveryPrice();
  await initializeLandingPage();
  await initializePackageProductContain();
  await initializeProduct();
  await initializeProductContentCategory();
  await initializeProductContentTranslation();
  await initializeProductContentType();
  await initializeProductPeriod();
  await initializeProductPeriodPrice();
  await initializeProductStatus();
  await initializeProductType();
  await initializeSingleProductType();
  await initializeRole();
  await initializeUser();
  await initializeUserActivitionStatus();
  await initializeUserActivity();
  await initializeUserSubCategory();
};

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  Address,
  AgeGroup,
  Country,
  Currency,
  DeliveryType,
  DownloadHistory,
  GuestSubscriber,
  Job,
  PaymentStatus,
  ProductLanguage,
  SiteLanguage,
  Zone,
  Claim,
  Comment,
  ContactUs,
  MessageStatus,
  Basket,
  CustomerOrder,
  CustomerOrderStatus,
  Invoice,
  PublisherOrder,
  PublisherOrderStatus,
  DeliveryPrice,
  LandingPage,
  PackageProductContain,
  Product,
  ProductContentCategory,
  ProductContentTranslation,
  ProductContentType,
  ProductPeriod,
  ProductPeriodPrice,
  ProductStatus,
  ProductType,
  SingleProductType,
  Role,
  User,
  UserActivitionStatus,
  userActivity,
  UserSubCategory,
  initializeDatabase
};
