import React from "react";
import { View } from "react-native";
import ContainerScroll from "@/components/common/ContainerScroll";
import BoldText from "@/components/texts/BoldText";
import LightText from "@/components/texts/LightText";
import H1 from "@/components/texts/H1";

const TermsAndConditionsScreen = () => {
  return (
    <ContainerScroll>
      <H1 className="text-center">Terms and Conditions</H1>

      <View className="gap-2">
        <LightText>
          Welcome to Life Core. By accessing or using our social media platform,
          you agree to comply with and be bound by the following Terms and
          Conditions. Please read them carefully.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>1. Acceptance of Terms</BoldText>
        <LightText>
          By creating an account or using our Service, you agree to these Terms
          and all applicable laws and regulations. If you do not agree, please
          do not use our Service.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>2. Eligibility</BoldText>
        <LightText>
          You must be at least 13 years old (or the minimum age required in your
          jurisdiction) to use our Service. By registering, you represent and
          warrant that you meet this requirement.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>3. User Accounts</BoldText>
        <LightText>
          You are responsible for maintaining the confidentiality of your
          account information and for all activities under your account. You
          agree to provide accurate and complete information during registration
          and to update it as necessary.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>4. User Content</BoldText>
        <LightText>
          You retain ownership of the content you post on our platform. By
          posting content, you grant us a worldwide, non-exclusive, royalty-free
          license to use, display, distribute, and reproduce your content for
          the purpose of operating and promoting the Service.
        </LightText>
        <LightText>
          You agree not to post content that:
          {"\n"}- Violates any law or regulation{"\n"}- Is abusive, defamatory,
          obscene, hateful, or otherwise objectionable{"\n"}- Infringes
          intellectual property rights or privacy rights of others
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>5. Prohibited Conduct</BoldText>
        <LightText>
          You agree not to:
          {"\n"}- Use the Service for any unlawful or harmful purposes{"\n"}-
          Harass, threaten, or harm other users{"\n"}- Attempt to gain
          unauthorized access to other accounts or systems{"\n"}- Upload
          viruses, malware, or other harmful code{"\n"}- Use automated means
          (bots) to interact with the Service without permission
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>6. Content Moderation</BoldText>
        <LightText>
          We reserve the right to remove or restrict access to any User Content
          that violates these Terms or that we deem inappropriate. We may
          suspend or terminate accounts for violations without prior notice.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>7. Privacy</BoldText>
        <LightText>
          Your use of the Service is also governed by our Privacy Policy, which
          explains how we collect, use, and protect your personal data.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>8. Disclaimers and Limitation of Liability</BoldText>
        <LightText>
          The Service is provided “as is” and “as available.” We make no
          warranties regarding the accuracy, reliability, or availability of the
          Service. To the fullest extent permitted by law, we are not liable for
          any damages arising from your use or inability to use the Service.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>9. Changes to Terms</BoldText>
        <LightText>
          We may update these Terms from time to time. We will notify you of any
          material changes by posting the updated Terms on the platform.
          Continued use of the Service constitutes acceptance of the new Terms.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>10. Governing Law</BoldText>
        <LightText>
          These Terms are governed by the laws of Spain, without regard to
          conflict of law principles.
        </LightText>
      </View>
    </ContainerScroll>
  );
};

export default TermsAndConditionsScreen;
